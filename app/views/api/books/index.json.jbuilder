json.ignore_nil!
json.array! @books do |book|
  json.partial! 'book', book: book
  json.reviews book.reviews do |review|
    json.extract! review, :id, :comment, :rating, :user_id
    json.user do
      json.id review.user.id
      json.username review.user.username
      json.image review.user.image
    end
  end
end
