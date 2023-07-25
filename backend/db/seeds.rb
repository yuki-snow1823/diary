require 'csv'

puts 'Seeding Users started...'

users = []
user_count = 0

CSV.foreach('db/seeds_csv/user.csv', headers: true) do |row|
  users << {
    id: row['id'],
    provider: 'email',
    uid: row['email'],
    encrypted_password: BCrypt::Password.create(row['password']),
    confirmed_at: Time.now,
    name: row['name'],
    nickname: row['nickname'],
    email: row['email'],
    created_at: Time.now,
    updated_at: Time.now,
  }
  user_count += 1
end

User.upsert_all(users)

puts "Created #{user_count} Users!"

puts 'Seeding Journals started...'

journals = []
journal_count = 0

CSV.foreach('db/seeds_csv/journal.csv', headers: true) do |row|
  journals << {
    id: row['id'],
    title: row['title'],
    content: row['content'],
    user_id: row['user_id'],
  }
  journal_count += 1
end

Journal.upsert_all(journals)

puts "Created #{journal_count} Journals!"
