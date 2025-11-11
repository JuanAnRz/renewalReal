const productos = async (busqueda) => {
    const response = await fetch('products.json');
    const data = await response.json();
    if (busqueda) {
        return data.filter(producto => producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.category.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.subcategory.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.description.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.tags.some(tag => tag.toLowerCase().includes(busqueda.toLowerCase()))  
        );
    }
    return data;
}

function renderProductos1(productosArray) {
    const seccion = document.getElementById('search-res');
    if (!seccion) return;
    
    // Limpiar contenido anterior
    seccion.innerHTML = '';
    
    // Si no hay productos
    if (productosArray.length === 0) {
        seccion.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    // Crear contenedor grid
    const grid = document.createElement('div');
    grid.style.cssText = 'display:flex; flex-wrap:wrap; gap:20px; justify-content:center;';
    
    productosArray.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add("card");
        card.innerHTML = `
            <h3>${producto.name}</h3>
            <p>Categoría: ${producto.category}</p>
            <p>Subcategoría: ${producto.subcategory}</p>
            <p>Precio: $${producto.price}</p>
        `;
        grid.appendChild(card);
    });
    
    seccion.appendChild(grid);
}
function renderProductos(productosArray) {
    const seccion = document.querySelector('div section');
    if (!seccion) return;
    
    // Limpiar contenido anterior
    seccion.innerHTML = '';
    
    // Si no hay productos
    if (productosArray.length === 0) {
        seccion.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    // Crear contenedor grid
    const grid = document.createElement('div');
    grid.style.cssText = 'display:flex; flex-wrap:wrap; gap:20px; justify-content:center;';
    
    productosArray.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add("card");
        card.innerHTML = `
            <h3>${producto.name}</h3>
            <p>Categoría: ${producto.category}</p>
            <p>Subcategoría: ${producto.subcategory}</p>
            <p>Precio: $${producto.price}</p>
        `;
        grid.appendChild(card);
    });
    
    seccion.appendChild(grid);
}

// Llamar a la función
const busqueda= document.getElementById("search");
const busquedam= document.getElementById("search-m");
busqueda.addEventListener("input", () => {
    const valorBusqueda = busqueda.value;
    productos(valorBusqueda).then(resultado => {
        console.log(resultado);
        renderProductos1(resultado);
    });
    
});

busquedam.addEventListener("input", () => {
    const valorBusqueda = busquedam.value;
    if (valorBusqueda.length<= 1){
        const seccion = document.querySelector('div section');
        seccion.innerHTML = 'Ingrese al menos 2 caracteres para buscar.';
    }else{
        productos(valorBusqueda).then(resultado => {
        renderProductos(resultado);
    });
    }
    
});