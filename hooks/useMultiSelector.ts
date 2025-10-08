import { useState } from 'react';

export const useMultiSelector = () => {
    // Dropdown states
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
    const [selectedPart, setSelectedPart] = useState<string | null>(null);

    // Input states
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    // Dropdown options
    const carType = ['5l', '3l', 'dolpine', 'abadula'];
    const conditionOptions = ['new', 'dubai'];
    const partOptions = ['body', 'motor', 'leg'];

    // Reset all selections
    const resetAll = () => {
        setSelectedSize(null);
        setSelectedCondition(null);
        setSelectedPart(null);
        setDescription('');
        setPrice('');
    };

    // Get all data as object
    const getFormData = () => ({
        size: selectedSize,
        condition: selectedCondition,
        part: selectedPart,
        description,
        price
    });

    return {
        // Dropdown states
        selectedSize,
        selectedCondition,
        selectedPart,

        // Dropdown setters
        setSelectedSize,
        setSelectedCondition,
        setSelectedPart,

        // Input states
        description,
        setDescription,
        price,
        setPrice,

        // Options
        carType,
        conditionOptions,
        partOptions,

        // Functions
        resetAll,
        getFormData
    };
};