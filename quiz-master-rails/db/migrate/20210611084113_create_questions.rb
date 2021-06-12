class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :content, null: false
      t.string :answer, null: false
      t.string :status, null: false, default: "active"

      t.timestamps
    end
  end
end
