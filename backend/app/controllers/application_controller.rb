class ApplicationController < ActionController::API
  include ResourceRenderable

  rescue_from ActiveRecord::RecordInvalid do |error|
    render_resource_errors(error.record&.errors)
  end
end
