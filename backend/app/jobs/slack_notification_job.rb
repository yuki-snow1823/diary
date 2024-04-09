class SlackNotificationJob < ApplicationJob
  queue_as :default

  def perform(message)
    conn = Faraday.new(url: 'https://hooks.slack.com')
    conn.post do |req|
      req.url ENV['SLACK_WEBHOOK_URL']
      req.headers['Content-Type'] = 'application/json'
      req.body = { text: message }.to_json
    end
  end
end
