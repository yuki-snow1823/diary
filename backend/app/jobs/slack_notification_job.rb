class SlackNotificationJob < ApplicationJob
  queue_as :default

  def perform(name)
    conn = Faraday.new(url: "https://hooks.slack.com")
    response = conn.post do |req|
      req.url '/services/{固有キー}/{固有キー}'
      req.headers['Content-Type'] = 'application/json'
      req.body = { text: "#{name} さんがDiaryに記事を投稿したよ！"}.to_json
    end
  end
end
