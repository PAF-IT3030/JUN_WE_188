package com.example.server.controller;

import com.example.server.DTO.commentworkoutDTO;
import com.example.server.model.commentworkout;
import com.example.server.service.commentworkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commentworkouts")
public class commentworkoutController {

    @Autowired
    private commentworkoutService commentworkoutService;

    @PostMapping("/{id}/comments")
    public ResponseEntity<commentworkout> addComment(@PathVariable long id, @RequestBody commentworkoutDTO comment) {
        commentworkout updatedCommentworkout = commentworkoutService.addComment(id, comment.getComment());
        if (updatedCommentworkout != null) {
            return ResponseEntity.ok(updatedCommentworkout);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<String>> showComments(@PathVariable long id) {
        List<String> comments = commentworkoutService.showComments(id);
        if (comments != null) {
            return ResponseEntity.ok(comments);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/comments/{index}")
    public ResponseEntity<String> editComment(@PathVariable long id, @PathVariable int index, @RequestBody commentworkoutDTO newComment) {
        if (commentworkoutService.editComment(id, index, newComment.getComment())) {
            return ResponseEntity.ok("Comment updated successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}/comments/{index}")
    public ResponseEntity<String> deleteComment(@PathVariable long id, @PathVariable int index) {
        if (commentworkoutService.deleteComment(id, index)) {
            return ResponseEntity.ok("Comment deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
}
