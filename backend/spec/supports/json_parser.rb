module JsonParser
  def json_response
    JSON.parse(response.body)
  end
end

RSpec.configure do |config|
  config.include JsonParser, type: :controller
end
