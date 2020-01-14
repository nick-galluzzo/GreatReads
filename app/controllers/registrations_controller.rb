class RegistrationsController < Devise::RegistrationsController
  def create
    @user = User.new(user_params)
    @user.image = 'https://uploads.scratch.mit.edu/users/avatars/395/5762.png'
    if @user.save!
      sign_in(@user)
      redirect_to root_path
    else
      warden.custom_failure!
      render json: { error: 'signup error' }, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find_by_email(user_params[:email])

    if @user.update_attributes(user_params)
      render json: @user
    else
      warden.custom_failure!
      render :json=> @user.errors, :status=>422
    end
  end

  def destroy
    @user = User.find_by_email(user_params[:email])
    if @user.destroy
      render :json=> { success: 'user was successfully deleted' }, :status=>201
    else
      render :json=> { error: 'user could not be deleted' }, :status=>422
    end
  end

  private

  def user_params
     params.require(:user).permit(:email, :password, :password_confirmation, :username)
  end
end
