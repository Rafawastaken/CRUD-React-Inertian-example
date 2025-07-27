<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Auth::user()->posts()->latest();

        if ($request->has('search') && $request->search !== null) {
            $query->whereAny(['title', 'content'], 'like', '%' . $request->search . '%');
        }
        $posts = $query->paginate(1);

        return Inertia::render('posts/index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'review' => ['required', 'string'],
            'status' => ['required', 'string'],
            'category' => ['required', 'string'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        $file = $request->file('image');
        $filepath = $file->store('posts', 'public');

        Post::create([
            'user_id' => auth()->user()->id,
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->review,
            'status' => $request->status,
            'category' => $request->category,
            'image' => $filepath,
        ]);

        return to_route("posts.index")->with('message', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('posts/edit', ['postData' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'review' => ['required', 'string'],
            'status' => ['required', 'string'],
            'category' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        $filepath = $post->image;
        if ($request->hasFile('image') && $request->image !== null) {
            $file = $request->file('image');
            $filepath = $file->store('posts', 'public');
            // Delete old image
            Storage::disk('public')->delete($post->image);
        }

        $post->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->review,
            'status' => $request->status,
            'category' => $request->category,
            'image' => $filepath,
        ]);

        return to_route("posts.index")->with('message', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
