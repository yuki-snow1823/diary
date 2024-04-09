require 'rails_helper'

RSpec.describe SlackNotificationJob, type: :job do
  include ActiveJob::TestHelper

  subject(:job) { described_class.perform_later('Test User') }

  it 'ジョブがキューに入ること' do
    expect { job }
      .to change(ActiveJob::Base.queue_adapter.enqueued_jobs, :size).by(1)
  end

  it 'postされること' do
    expect_any_instance_of(Faraday::Connection).to receive(:post)
    perform_enqueued_jobs { job }
  end
end