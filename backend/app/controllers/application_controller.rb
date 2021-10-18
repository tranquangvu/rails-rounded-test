class ApplicationController < ActionController::API
  include ResourceRenderable

  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: nil, status: :not_found
  end

  rescue_from ActiveRecord::RecordInvalid do |error|
    render_resource_errors(error.record&.errors)
  end

  rescue_from ActiveRecord::RecordNotDestroyed do |error|
    render_resource_errors(error.record&.errors)
  end
end
