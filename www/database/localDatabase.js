angular.module('atendeFacil').service('localDatabase', function () {
    const keyStorage = "database"

    this.initialData = function () {
        if (!localStorage.getItem(keyStorage)) { //inicializa caso n exista os dados
            localStorage.setItem(keyStorage, JSON.stringify({ categories: [], phrases: {} }))
        }
    }

    this.getData = function () { //obter dados
        return JSON.parse(localStorage.getItem(keyStorage))
    }


    // ######################## ADD CATEGORIES ##############################
    this.addCategories = function (nameCategory) {
        let data = this.getData()

        if (!data.categories) data.categories = []

        // remover espaços extras e manter apenas um espaço entre palavras
        let cleanedName = nameCategory.replace(/\s+/g, ' ').trim()

        // Verificação: impedir categorias duplicadas após limpeza
        let existsCategory = data.categories.some(category => category.name.toLowerCase() === cleanedName.toLowerCase())

        if (existsCategory) {
            alert("A categoria já existe!")
            return null // Retorna null se a categoria já existir
        }

        // Criando a nova categoria com nome limpo
        const newCategory = {
            id: Date.now(),
            name: cleanedName
        }

        data.categories.push(newCategory)
        data.phrases[newCategory.id] = []

        localStorage.setItem(keyStorage, JSON.stringify(data))

        return newCategory.id
    }
    // ############################################################################

    this.addPhrases = function (categoryId, phraseText) { //add phrases
        let data = this.getData()
        // add no futuro um log caso o resultado seja verdade
        if (!data.phrases[categoryId]) return //verifica se n existe o category id
        data.phrases[categoryId].push(phraseText)
        localStorage.setItem(keyStorage, JSON.stringify(data))
    }

    this.deleteCategories = function (categoryId) { //delete categories
        let data = this.getData()

        data.categories = data.categories.filter(category => category.id !== categoryId) // cria nova array sem o item escolhido para exclusão

        delete data.phrases[categoryId] //delete todas a phrases das categorias
        localStorage.setItem(keyStorage, JSON.stringify(data))
    }

    this.deletePhrases = function (categoryId, phraseIndex) { //delete phrases
        let data = this.getData()

        if (!data.phrases[categoryId]) return //verifica se n existe o category id

        data.phrases[categoryId].splice(phraseIndex, 1) //remove a frase pelo índice

        localStorage.setItem(keyStorage, JSON.stringify(data)) //atualiza dados
    }

    this.deleteAllData = function () { //delete data total
        localStorage.setItem(keyStorage, JSON.stringify({ categories: [], phrases: {} }))
    }

})