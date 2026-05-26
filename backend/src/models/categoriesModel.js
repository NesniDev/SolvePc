import categories from '../data-mockup/categories.json' with { type: 'json' }

export class CategoriesModel {

  static async getAllCategories() {

    const data = categories;

    return data
  }

  static getCategoryById(id) {

    const category = categories.find((category) => category.slug === id)

    if (!category) return null

    return category


  }
}