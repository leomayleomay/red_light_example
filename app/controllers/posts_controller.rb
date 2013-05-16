class PostsController < ApplicationController
  before_filter :authenticate_user!

  def new
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(params[:post])

    if @post.save
      redirect_to root_path, :notice => "Done"
    else
      render :new
    end
  end
end
