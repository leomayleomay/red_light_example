class SessionsController < Devise::SessionsController
  layout false

  # for fancy login, we can not make sure user's seession is timeout, so will allow sign in all the time.
  skip_filter :require_no_authentication

  def new
    if params[:return_to].present?
      session[:return_to] = params[:return_to]
    end

    super
  end

  def after_sign_in_path_for(resource)
    if session[:return_to].present?
      return session[:return_to]
    end

    super
  end
end
