package com.example.server.service;

import com.example.server.model.commentworkout;
import com.example.server.repository.commentworkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class commentworkoutServiceImpl implements commentworkoutService {

    @Autowired
    private commentworkoutRepository commentworkoutRepo;

    @Override
    public commentworkout addComment(long id, String comment) {
        commentworkout existingCommentworkout = commentworkoutRepo.findById(id).orElse(null);
        if (existingCommentworkout != null) {
            existingCommentworkout.addComment(comment);
            return commentworkoutRepo.save(existingCommentworkout);
        }
        return null;
    }

    @Override
    public List<String> showComments(long id) {
        commentworkout existingCommentworkout = commentworkoutRepo.findById(id).orElse(null);
        if (existingCommentworkout != null) {
            return existingCommentworkout.getComments();
        }
        return null;
    }

    @Override
    public boolean editComment(long id, int index, String newComment) {
        commentworkout existingCommentworkout = commentworkoutRepo.findById(id).orElse(null);
        if (existingCommentworkout != null && index >= 0 && index < existingCommentworkout.getComments().size()) {
            existingCommentworkout.getComments().set(index, newComment);
            commentworkoutRepo.save(existingCommentworkout);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteComment(long id, int index) {
        commentworkout existingCommentworkout = commentworkoutRepo.findById(id).orElse(null);
        if (existingCommentworkout != null && index >= 0 && index < existingCommentworkout.getComments().size()) {
            existingCommentworkout.deleteComment(index);
            commentworkoutRepo.save(existingCommentworkout);
            return true;
        }
        return false;
    }
}
