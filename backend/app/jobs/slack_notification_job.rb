class SlackNotificationJob < ApplicationJob
  queue_as :default

  def perform(name)
    conn = Faraday.new(url: 'https://hooks.slack.com')
    conn.post do |req|
      req.url ENV['SLACK_WEBHOOK_URL']
      req.headers['Content-Type'] = 'application/json'
      req.body = { text: "#{name} さんがDiaryに記事を投稿したよ！" }.to_json
    end
  end
end
