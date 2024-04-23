package net.javaguide.ems.service;

import net.javaguide.ems.entity.Comment;
import net.javaguide.ems.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(Long id) {
        return commentRepository.findById(id)
                .orElse(null);
    }

    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment updateComment(Long id, Comment updatedComment) {
        Comment existingComment = commentRepository.findById(id)
                .orElse(null);

        if (existingComment != null) {
            existingComment.setContent(updatedComment.getContent());
            // Update other fields as needed
            return commentRepository.save(existingComment);
        } else {
            return null; // or throw exception
        }
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
