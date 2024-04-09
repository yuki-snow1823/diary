class SlackNotificationJob < ApplicationJob
  queue_as :default

  def perform(message)
    conn = Faraday.new
    conn.post do |req|
      req.url ENV.fetch('SLACK_WEBHOOK_URL', nil)
      req.headers['Content-Type'] = 'application/json'
      req.body = { text: message }.to_json
    end
  rescue Faraday::Error => e
    Rails.logger.error "SlackNotificationJob Error: #{e.message}"
  end
end
