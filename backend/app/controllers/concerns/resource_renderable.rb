module ResourceRenderable
  extend ActiveSupport::Concern

  def render_resources(resources, options = {})
    each_serializer = options[:each_serializer] || "#{resources.ancestors.first.name}Serializer".constantize
    serializer_options = options.reject { |key| key.in?(render_options) }
                                .merge(each_serializer: each_serializer)
    render json: ActiveModelSerializers::SerializableResource.new(resources, serializer_options).to_json, status: options[:status] || :ok
  end

  def render_resource(resource, options = {})
    serializer = options[:serializer] || "#{resource.class.name}Serializer".constantize
    serializer_options = options.merge(serializer: serializer)
    render json: ActiveModelSerializers::SerializableResource.new(resource, serializer_options).to_json, status: options[:status] || :ok
  end

  def render_resource_errors(errors, options = {})
    render json: errors.to_hash(true), status: options[:status] || :bad_request
  end

  private

  def render_options
    %i[status]
  end
end
