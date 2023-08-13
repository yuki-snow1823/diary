module Auth
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    private

    def sign_up_params
      params.require(:registration).permit(:name, :email, :password, :password_confirmation)
    end
  end
end
