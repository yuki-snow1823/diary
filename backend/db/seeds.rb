# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'Seeding Users started...'

users_num = 10

users_num.times do |i|
  begin
    User.create!(
      name: "user_#{i + 1}",
      nickname: "nickname_#{i + 1}",
      email: "example_#{i + 1}@example.com",
      password: 'password',
      confirmed_at: Time.now
    )
  rescue => exception
    puts "skip create user_#{i + 1} : #{exception.message}"
  end
end

puts 'Seeding Users finished!'

puts 'Seeding Journals started...'

max_journals_num_per_user = 10

users_num.times do |user|
  journals_num_per_user = rand(max_journals_num_per_user)
  journals_num_per_user.times do |journal|
    begin
      Journal.create!(
        title: "journal_#{journal + 1} by user_#{user + 1}",
        content: "content_#{journal + 1} by user_#{user + 1}",
        user_id: user + 1
      )
    rescue => exception
      puts "skip create journal_#{journal + 1} by user_#{user + 1} : #{exception.message}"
    end
  end
end

puts 'Seeding Journals finished!'
