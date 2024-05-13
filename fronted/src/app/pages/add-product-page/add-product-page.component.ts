import {Component} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {CategoryState, GetAllCategory} from "../../store/category/state/Category.state";
import {Select, Store} from "@ngxs/store";
import {Category} from "../../models/category";
import {forkJoin, Observable} from "rxjs";
import {ProductService} from "../../store/product/service/Product.service";
import {GalleryItemService} from "../../store/galleryItem/service/GalleryItem.service";
import {GalleryItem} from "../../models/galleryItem";
import {ProductRequest} from "../../models/requests/productRequest";
import {DELETEComponent} from "../../components/delete/delete.component";

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    AsyncPipe,
    DELETEComponent,
  ],
  template: `
    <app-header/>
    <section
      class="px-5 lg:px-0 max-w-[500px] items-center py-14 m-auto flex flex-col justify-between">
      <h2 class="text-2xl uppercase my-6 text-center">Создать товар</h2>
      <form [formGroup]="addProductForm" (ngSubmit)="submit()">
        <input class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Название"
               type="text" formControlName="name">
        <input class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Описание"
               type="text" formControlName="description">
        <input class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Тип"
               type="text" formControlName="product_type">
        <input value="" class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Цена"
               type="number" formControlName="price">
        <input value="" class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Ссылка на товар"
               type="text" formControlName="link">
        <input value="" class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Детали (пишите через точку с запятой ;)"
               type="text" formControlName="details">
        <input value="" class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" placeholder="Состав (пишите через точку с запятой ;)"
               type="text" formControlName="composition">
        <select class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray" formControlName="category_id">
          <option  [value]="category.id" *ngFor="let category of categories$ | async">
            {{category.name}}
          </option>
        </select>
        <div formArrayName="inputs">
          <div *ngFor="let input of inputForms.controls; let i = index">
            <input
              (input)="onChange(i)"
              placeholder="Ссылка на картинку"
              class="w-full mb-5 h-9 pl-4 outline-0 border border-color-gray"
              type="text" [formControlName]="i">
          </div>
        </div>
        <button
          class="uppercase py-[16px] w-full bg-button-header-black text-button-header-white rounded-md font-medium my-10">
          Создать
        </button>
      </form>
    </section>
    <app-delete/>
    <app-footer/>
  `,
})
export class AddProductPageComponent {
  addProductForm: FormGroup;
  @Select(CategoryState.selectCategories) categories$!: Observable<Category[]>;

  submit() {
    const itemCreationObservables: Observable<GalleryItem>[] = this.addProductForm.value.inputs.slice(0, this.addProductForm.value.inputs.length - 1).map((item: string) => this.galleryItemService.createGalleryItem({image: item}));
    forkJoin(itemCreationObservables).subscribe({
      next: (createdImages: GalleryItem[]) => {
        const productRequest: ProductRequest = {
          name: this.addProductForm.value.name,
          description: this.addProductForm.value.description,
          product_type: this.addProductForm.value.product_type,
          category_id: this.addProductForm.value.category_id,
          price: this.addProductForm.value.price,
          details: this.addProductForm.value.details.split(";"),
          composition: this.addProductForm.value.composition.split(";"),
          link: this.addProductForm.value.link,
          gallery: createdImages.map((galleryItem) => galleryItem.id),
        };
        this.productService.createProduct(productRequest).subscribe(response => console.log(response));
      },
      error: (error) => console.log(error),
    });
  }

  constructor(private formBuilder: FormBuilder, private store: Store, private productService: ProductService, private galleryItemService: GalleryItemService) {
    this.categories$.subscribe({
      next: (categories) => {
        if (!categories) this.store.dispatch(new GetAllCategory());
      }
    });

    this.addProductForm = this.formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
      category_id: new FormControl(''),
      product_type: new FormControl(''),
      price: new FormControl(null),
      link: new FormControl(''),
      details: new FormControl(''),
      composition: new FormControl(''),
      inputs: this.formBuilder.array([])
    });

    this.addInput();
  }

  get inputForms() {
    return this.addProductForm.get('inputs') as FormArray;
  }

  addInput() {
    this.inputForms.push(new FormControl(''));
  }

  onChange(index: number) {
    const lastIndex = this.inputForms.length - 1;
    if (index === lastIndex && this.inputForms.at(index).value !== '') {
      this.addInput();
    }
  }
}
