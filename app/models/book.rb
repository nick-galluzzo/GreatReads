class Book < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :image, presence: true

  belongs_to :author
  belongs_to :genre

  has_many :reviews, dependent: :destroy
  has_many :book_subscriptions, dependent: :destroy
  has_many :bookshelves,
           through: :book_subscriptions

  def average_rating
    ratings.count < 1 ? 0 : (ratings.reduce(:+) / ((ratings.count * 100.0).round / 100.0)).round(2)
  end

  def review_count
    reviews.count
  end

  def suggest_percentage
    all_suggestions_count < 1 ? 0 : ((suggest_true_count.to_f / all_suggestions_count.to_f) * 100).round
  end

  # all books from book's author
  def other_books
    other_books = []

    author.books.each do |book|
      other_books << book unless book == self
    end

    other_books
  end

  # Books from same genre
  def suggested_books
    books = genre.books.sample(6)
      until books == books.uniq
        books = genre.books.sample(6)
      end

    books
  end

  private

  def all_suggestions_count
    reviews.map(&:suggest).count
  end

  def suggest_true_count
    suggestions = reviews.map(&:suggest)
    suggestions.select {|s| s == true}.count
  end

  def ratings
    self.reviews.map(&:rating)
  end
end
