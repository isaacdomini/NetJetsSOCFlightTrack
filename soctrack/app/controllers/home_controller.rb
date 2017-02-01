class HomeController < ApplicationController
  before_action :authenticate_request
  def home
    render json: { status: 'OK'}, status: 200;
  end
end
