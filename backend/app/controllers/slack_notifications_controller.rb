class SlackNotificationsController < ApplicationController
  class << self
    def call(name)
      SlackNotificationJob.perform_later(name)
    end
  end
end
