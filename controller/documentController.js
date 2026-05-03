const Document = require('../models/documentModel')
const User = require('../models/userModel');
const { createShareEmailTemplate } = require('../utils/emailTemplate');

const documentController = {
    createDocument: async(req,res) => {
        try {
            //get details from db
            const {title,content} = req.body;

            //title is required
            if(!title) {
                return res.status(400).json({message:"Title is Required"})
            }

            //create new document
            const doc = await Document.create({
                title,
                content,
                owner: req.userId
            })

            //link to the user
            await User.findByIdAndUpdate(req.userId,{
                $push: {documents: doc._id}
            })

            res.status(201).json({message: "Document created Successfully", document: doc})
        } catch (error) {
            res.status(500).json({message: "Failed to create Document", error: error.message})
        }
    },
    getMyDocument: async(req,res) => {
        try {
            const docs = await Document.find(req.params.id);

            res.status(200).json({message: "Document Fetch Successfully"})
        } catch (error) {
            res.status(500).json ({message: "Error to fetch Document", error: error.message})
        }
    },
    getShareDocument: async(req,res) => {
        try {
            const docs = await Document.find({"collaborators.user" : req.userId})
            .populate("owner", "name email")
            .populate("collaborator.user", "name email");

            res.status(201).json({message:"Document Shared Successfully", document: docs})
        } catch (error) {
            res.status(500).json({message:"Failed to Share the Document"})
        }
    },
    getDocumentById: async(req,res) => {
        try {
            const docs = await Document.findById(req.params.id);

            if(!doc){
                return res.status(404).json({message:"Document not Found"})
            }

            res.status(200).json({message:'My Documents fetch Successfully',document: doc})
        } catch (error) {
            res.status(500).json({message:"Error to fetch Documents",error:error.message})
        }
    },
    updateDocument: async(req,res) => {
        try{
        const {title,content} = req.body;
        //find document
        const doc = await Document.findById(req.params.id);

        if(!doc){
            return res.status(404).json({message:"Document not Found"})
        }

        //check Permission (owner or editor)
        if(doc.owner.toString() !== req.userId){
            const collaborator = doc.collaborators.find(
                (c) => c.user.toString() === req.userId &&
                c.role === "editor"
            );

            if(!collaborator) {
                return res.status(403).json({message:"You Don't have permission to edit this document"})
            }
        }
        //update only provided field
        if(title !== undefined) doc.title = title;
        if(content !== undefined) doc.content = content;

        //save update document 
        await doc.save();

        //send Response
        res.status(200).json({message:"Document Updated Successfully", document: doc})
        }catch (error){
            res.status(500).json({message:"Failed to Update Document",error: error.message})
        }
    },
    deleteDocument: async(req,res) => {
        try {
            const doc = await Document.findById(req.params.Id);

            if(!doc){
                return res.status(403).json({message: "Document not Found"})
            }

            //owner only delete the document
            if(doc.owner.toString() !== req.userId){
                return res.status(403).json({message: "Not Allowed"})
            }

            await doc.deleteOne();

            res.status(200).json({message: "Document Deleted Successfully"})
        } catch (error) {
            res.staus(500).json({message:'Failed to Delete Document'})
        }
    },
    shareDocument: async(req,res) => {
        try {
            const {email, role} = req.body;

            const doc = await Document.findById(req.params.id);

            if(!doc){
                return res.status(404).json({message:"Document not Found"})
            }

            //only owner
            if(doc.owner.toString() !== req.userId){
                return res.status(403).json({message:"Only Owner can Share"})
            }

            const user = await User.findOne({ email })

            if(!user){
                return res.status(404).json({message:"User not Found"})
            }

            //prevent duplicate
            const exists = doc.collaborators.find(
                c => c.user.toString()  === user._id.toString()
            );

            doc.collaborators.push({
                user:user._id,
                role: role || "viewer"
            });

            await doc.save()

            //send Email
            const html = createShareEmailTemplate({
                    receiverName: user.name,
                    ownerName: req.user.name || "Someone",
                    docTitle: doc.title,
                    role: role || "viewer",
                    link: `http://localhost:5000/documents/${doc._id}`
                    });

            await sendEmail({
            to: email,
            subject: `📄 ${req.user.name} shared a document with you`,
            html
            });

            res.status(200).json({message:"Document Shared and Email Send Successfully"})
        } catch (error) {
            res.status(500).json({mesasge:"Failed to share Document",error:error.message})
        }
    },
    removeCollaborator: async(req,res) => {
        try {
            const { userId } = req.body;

            const doc = await Document.findById(req.params.id);

            if(!doc){
                return res.status(404).json({message:"Document not Found"})
            }

            if(doc.owner.toString() !== req.userId){
                return res.status(403).json({message:"Only Owner can remove access" })
            }

            doc.collaborators = doc.collaborators.filter(
                c => c.user.toString() !== userId
            )

            await doc.save();

            res.json({message: "Access Removed Successfully"})
        } catch (error) {
            res.staus(500).json({message: "Removed Collaborator"})
        }
    }
}

module.exports = documentController