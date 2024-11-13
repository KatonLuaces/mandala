document.getElementById('generate-btn').onclick = async () => {
    try {
        const response = await fetch('/api/generateMandala');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('mandala-image').src = data.imageUrl;
    } catch (error) {
        console.error('Error generating mandala:', error);
        alert('Failed to generate mandala. Please try again.');
    }
};