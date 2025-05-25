angular.module('atendeFacil').service('localDatabase', function () {
    const KEY_STORAGE = "database";
    const INITIAL_DATA = { categories: [], phrases: {} };

    // Funções auxiliares privadas
    const getData = () => {
        return JSON.parse(localStorage.getItem(KEY_STORAGE));
    };

    const saveData = (data) => {
        localStorage.setItem(KEY_STORAGE, JSON.stringify(data));
    };

    const validateCategoryId = (data, categoryId) => {
        return data.phrases && data.phrases[categoryId];
    };

    // Inicialização
    this.initialData = () => {
        if (!localStorage.getItem(KEY_STORAGE)) {
            saveData(INITIAL_DATA);
        }
    };

    // Métodos públicos
    this.getData = getData;

    // Gerenciamento de Categorias
    this.addCategories = (nameCategory) => {
        let data = getData();
        if (!data.categories) data.categories = [];

        // Limpa e normaliza o nome
        const cleanedName = nameCategory.replace(/\s+/g, ' ').trim();

        // Verifica duplicatas
        const existsCategory = data.categories.some(
            category => category.name.toLowerCase() === cleanedName.toLowerCase()
        );

        if (existsCategory) {
            alert("A categoria já existe!");
            return null;
        }

        // Cria nova categoria
        const newCategory = {
            id: Date.now(),
            name: cleanedName
        };

        data.categories.push(newCategory);
        data.phrases[newCategory.id] = [];
        saveData(data);

        return newCategory.id;
    };

    this.deleteCategories = (categoryId) => {
        let data = getData();
        data.categories = data.categories.filter(category => category.id !== categoryId);
        delete data.phrases[categoryId];
        saveData(data);
    };

    // Gerenciamento de Frases
    this.addPhrases = (categoryId, phraseText) => {
        let data = getData();
        if (!validateCategoryId(data, categoryId)) return false;

        data.phrases[categoryId].push(phraseText.trim());
        saveData(data);
        return true;
    };

    this.deletePhrases = (categoryId, phraseIndex) => {
        let data = getData()
        if (!validateCategoryId(data, categoryId)) return false

        data.phrases[categoryId].splice(phraseIndex, 1)
        saveData(data)
        return true
    };

    this.editPhrase = (categoryId, phraseIndex, newText) => {
        let data = getData()
        if (!validateCategoryId(data, categoryId)) return false
        if (phraseIndex < 0 || phraseIndex >= data.phrases[categoryId].length) return false

        data.phrases[categoryId][phraseIndex] = newText.trim()
        saveData(data)
        return true
    };

    
    this.deleteAllData = () => {
        saveData(INITIAL_DATA)
    }
})