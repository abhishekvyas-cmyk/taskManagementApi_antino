const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {type: String,required: true,trim: true,},

    description: {type: String,trim: true,},

    status: {type: String,enum: ["pending", "in-progress", "completed"],default: "pending",},

    priority: {type: String,enum: ["low", "medium", "high"],default: "medium",},

    dueDate: {type: Date,},

    createdBy: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,},

    assignee: {type: mongoose.Schema.Types.ObjectId,ref: "User",default: null,},
  },
  { timestamps: true }
);

// Indexes for search and filters
taskSchema.index({ title: "text", description: "text" });
taskSchema.index({ status: 1, priority: 1, createdBy: 1 });

module.exports = mongoose.model("Task", taskSchema);