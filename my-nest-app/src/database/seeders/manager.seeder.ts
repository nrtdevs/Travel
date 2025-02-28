import AppDataSource from '../../config/typeorm.config'

const seed = async () => {
  try {
    // Initialize the data source (this connects to the database)
    await AppDataSource.initialize()
    console.log('DataSource initialized.')

    // Run all seeders
    
    console.log('Seeding complete.')
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    if (AppDataSource.isInitialized) {
      // Destroy the data source (this disconnects from the database)
      await AppDataSource.destroy()
      console.log('DataSource destroyed.')
    }
  }
}

// Execute the seed function
seed()
