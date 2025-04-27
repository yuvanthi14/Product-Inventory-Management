import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductCategory } from '../product-category.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  productCategories: ProductCategory[];
  selectedProduct: any | null = null;

  selectedProductId: number | null = null;
  editForm: any = {};

  selectedCategoryId: number | null = null;
  newProduct = { name: '', stock: 0, minQty: 0 };
  newCategory = { name: '' };
  isAddCategoryFormVisible = false;

  constructor(private productService: ProductService) {
    this.productCategories = [];
  }

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe(data => {
      this.productCategories = data;
    });
    this.loadProductCategories();
  }

  loadProductCategories(): void {
    this.productService.getProductCategories().subscribe((categories) => {
      this.productCategories = categories;
    });
  }

  showAddCategoryForm() {
    this.isAddCategoryFormVisible = true;
  }

  // Add new category
  addCategory() {
    if (this.newCategory.name.trim()) {
      const newCategory = { id: this.productCategories.length + 1, name: this.newCategory.name, products: [] };
      this.productCategories.push(newCategory);
      this.isAddCategoryFormVisible = false;
      this.newCategory.name = '';
    }
  }

  cancelAddCategory() {
    this.isAddCategoryFormVisible = false;
    this.newCategory.name = '';
  }

  showAddProductForm(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.newProduct = { name: '', stock: 0, minQty: 0 };
  }

  // Add new product
  addProduct(): void {
    if (!this.selectedCategoryId || !this.newProduct.name || !this.newProduct.stock || !this.newProduct.minQty) {
      alert('Please fill in all fields');
      return;
    }

    const category = this.productCategories.find(cat => cat.id === this.selectedCategoryId);
    if (category) {
      const newProduct = {
        ...this.newProduct,
        id: category.products.length + 1,
      };
      category.products.push(newProduct);
      this.productService.addProduct(category.id, category).subscribe(() => {
        this.selectedCategoryId = null;
        // this.loadProductCategories();
      });
    }
  }

  cancelAddProduct(): void {
    this.selectedCategoryId = null;
  }

  editProduct(product: any): void {
    this.selectedProductId = product.id;
    this.editForm = { ...product };
  }

  saveProduct(product: any): void {
    const categoryId = this.productCategories.find(category =>
      category.products.some(p => p.id === product.id)
    )?.id;

    if (categoryId) {
      this.productService.updateProduct(categoryId, product.id, this.editForm).subscribe(() => {
        this.selectedProductId = null;
        this.editForm = {};
        this.loadProductCategories();
      });
    }
  }

  cancelEdit(): void {
    this.selectedProductId = null;
    this.editForm = {};
  }

  deleteProduct(product: any): void {
    // Find the category that contains the product
    const category = this.productCategories.find((category) =>
      category.products.some((p: any) => p.id === product.id)
    );
    
    if (category) {
      // If the category is found, call the deleteProduct method on the service
      this.productService.deleteProduct(category.id, product.id).subscribe(
        () => {
          // If successful, reload product categories to reflect changes
          this.loadProductCategories();
        },
        (error) => {
          // Log any error that occurs
          console.error('Error deleting product:', error);
        }
      );
    } else {
      // If the category isn't found, log an error
      console.error('Product not found in any category');
    }
  }
  

}
