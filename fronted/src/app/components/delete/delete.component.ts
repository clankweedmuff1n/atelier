import {Component} from '@angular/core';
import {forkJoin} from "rxjs";
import {ProductRequest} from "../../models/requests/productRequest";
import {CategoryRequest} from "../../models/requests/categoryRequest";
import {ProductService} from "../../store/product/service/Product.service";
import {CategoryService} from "../../store/category/service/Category.service";
import {GalleryItemService} from "../../store/galleryItem/service/GalleryItem.service";

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  template: `
    <!--<ng-container *ngFor="let element of elements; index as i">
            <div
                    class="flex w-full max-w-6xl m-auto flex-col md:flex-row"
                    [class]="i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'">

                <button (click)="printCat()">test</button>

                <div class="w-full relative before:block before:pt-[100%]">
                    <div class="absolute inset-0 flex flex-col">
                        <img class="object-cover w-full h-full" [alt]="element.title" [src]="element.image"/>
                    </div>
                </div>

                <div class="bg-pink-50 w-full relative before:block before:pt-[100%]">
                    <div class="px-16 absolute inset-0 flex flex-col items-center justify-center ">
                        <h3 class="mb-6">{{ element.title }}</h3>
                        <p class="text-center mb-4">{{ element.caption }}</p>
                        <button class="hover:after:inset-0 after:-z-10 after:bg-pink-300 after:bg-opacity-60 after:w-full after:h-full after:absolute after:top-2.5 after:left-2.5 after:transition-all px-5 py-3.5 outline-0 border border-black cursor-pointer relative select-none z-10">
                            {{ element.button }}
                        </button>
                    </div>
                </div>


            </div>
        </ng-container>-->
    <section class="flex justify-center w-full p-10">
      <button (click)="addCategories()"
              class="hover:after:inset-0 after:-z-10 after:bg-pink-300 after:bg-opacity-60 after:w-full after:h-full after:absolute after:top-2.5 after:left-2.5 after:transition-all px-5 py-3.5 outline-0 border border-black cursor-pointer relative select-none z-10">
        Просто так не нажимайте
      </button>
    </section>
  `
})
export class DELETEComponent {
  constructor(private categoriesService: CategoryService, private galleryItemService: GalleryItemService, private productService: ProductService) {
  }

  addCategories() {
    let dressesCategoryId = -1;
    let sportsCategoryId = -1;
    let blazerCategoryId = -1;
    let costumesCategoryId = -1;
    let blouseCategoryId = -1;
    let trousersCategoryId = -1;

    this.galleryItemService.createGalleryItem({image: this.firstTrousersImages[0]})
      .subscribe(galleryItem => {
        const firstCategoryRequest: CategoryRequest = {
          name: "Брюки",
          description: "Брюки для женщин на любой случай",
          link: "trousers",
          button_text: "Перейти в каталог",
          preview: galleryItem.id
        };
        this.categoriesService.createCategory(firstCategoryRequest)
          .subscribe(category => trousersCategoryId = category.id);
      });

    this.galleryItemService.createGalleryItem({image: this.firstProductImages[0]})
      .subscribe(galleryItem => {
        const firstCategoryRequest: CategoryRequest = {
          name: "Платья",
          description: "Платья для женщин на любой случай",
          link: "dresses",
          button_text: "Перейти в каталог",
          preview: galleryItem.id
        };
        this.categoriesService.createCategory(firstCategoryRequest)
          .subscribe(category => dressesCategoryId = category.id);
      });

    this.galleryItemService.createGalleryItem({image: this.secondProductImages[0]})
      .subscribe(galleryItem => {
        const secondCategoryRequest: CategoryRequest = {
          name: "Спортивные костюмы",
          description: "Костюмы в стиле Sport-style отличаются по крою и материалам",
          link: "sport",
          button_text: "Перейти в каталог",
          preview: galleryItem.id
        };
        this.categoriesService.createCategory(secondCategoryRequest)
          .subscribe(category => sportsCategoryId = category.id);
      })

    this.galleryItemService.createGalleryItem({image: this.thirdProductImages[0]})
      .subscribe(galleryItem => {
        const categoryRequest: CategoryRequest = {
          name: "Пиджаки",
          description: "Женские пиджаки",
          link: "blazers",
          button_text: "Перейти в каталог",
          preview: galleryItem.id
        };
        this.categoriesService.createCategory(categoryRequest)
          .subscribe(category => blazerCategoryId = category.id);
      })

    this.galleryItemService.createGalleryItem({image: this.fourthProductImages[0]})
      .subscribe(galleryItem => {
        const secondCategoryRequest: CategoryRequest = {
          name: "Блузы",
          description: "Женские блузы",
          link: "blouse",
          button_text: "Перейти в каталог",
          preview: galleryItem.id
        };
        this.categoriesService.createCategory(secondCategoryRequest)
          .subscribe(category => blouseCategoryId = category.id);
      })

    this.galleryItemService.createGalleryItem({image: this.firstCostumeProductImages[0]})
      .subscribe(galleryItem => {
        const secondCategoryRequest: CategoryRequest = {
          name: "Костюмы",
          description: "Костюмы",
          link: "costumes",
          button_text: "Перейти в каталог",
          preview: galleryItem.id
        };
        this.categoriesService.createCategory(secondCategoryRequest)
          .subscribe(category => costumesCategoryId = category.id);
      })

    const firstProductGalleryItemObservables = this.firstProductImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const secondProductGalleryItemObservables = this.secondProductImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const thirdProductGalleryItemObservables = this.thirdProductImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const fourthProductGalleryItemObservables = this.fourthProductImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const firstCostumeProductGalleryItemObservables = this.firstCostumeProductImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const secondSportsProductGalleryItemObservables = this.secondSportsImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const secondBlazerProductGalleryItemObservables = this.secondBlazerImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const secondCostumesProductGalleryItemObservables = this.secondCostumesImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const thirdCostumesProductGalleryItemObservables = this.thirdCostumesImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const firstTrousersProductGalleryItemObservables = this.firstTrousersImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const secondDressesProductGalleryItemObservables = this.secondDressesImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    const fourthCostumesProductGalleryItemObservables = this.fourthCostumesImages.map(element => {
      return this.galleryItemService.createGalleryItem({image: element});
    });

    forkJoin(firstTrousersProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Брюки",
            description: "Product description ",
            product_type: 'random_type',
            link: "brown-trousers",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: trousersCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );

    /*forkJoin(secondProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Спортивный костюм",
            description: "Product description ",
            product_type: 'random_type',
            link: "sports-suit",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: sportsCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );*/

    forkJoin(secondDressesProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Чёрное платье",
            description: "",
            product_type: 'random_type',
            link: "blackest-dress",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: dressesCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );

    /*forkJoin(firstProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Чёрное платье",
            description: "",
            product_type: 'random_type',
            link: "black-dress",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: dressesCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );*/

    /*forkJoin(thirdProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Пиджак",
            description: "",
            product_type: 'random_type',
            link: "blazer",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: blazerCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );*/

    forkJoin(firstCostumeProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Костюм",
            description: "",
            product_type: 'random_type',
            link: "beige-costume",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: costumesCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );

    /*forkJoin(fourthCostumesProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Костюм",
            description: "",
            product_type: 'random_type',
            link: "another-costume",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: costumesCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );*/

    /*forkJoin(secondCostumesProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Костюм",
            description: "",
            product_type: 'random_type',
            link: "dark-costume",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: costumesCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );*/

    forkJoin(thirdCostumesProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Костюм",
            description: "",
            product_type: 'random_type',
            link: "darkest-costume",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: costumesCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );

    forkJoin(secondSportsProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Спортивный костюм",
            description: "",
            product_type: 'random_type',
            link: "second-beige-sports-costume",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: sportsCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );

    forkJoin(secondBlazerProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Пиджак женский",
            description: "",
            product_type: 'random_type',
            link: "beige-sports-costume",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: blazerCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );

    /*forkJoin(fourthProductGalleryItemObservables)
      .subscribe((galleryItems) => {
          const productRequest: ProductRequest = {
            name: "Блуза",
            description: "Женскиая блуза",
            product_type: 'random_type',
            link: "black-blouse",
            details: ["first detail", "second detail"],
            composition: ["first comp", "second comp"],
            price: Math.random() * 100,
            category_id: firstCategoryId,
            gallery: galleryItems.map(galleryItem => galleryItem.id),
          };
          this.productService.createProduct(productRequest).subscribe({
            next: value => console.log(value)
          });
        }
      );*/
  }

  readonly firstProductImages = [ // платья
    "https://i.ibb.co/nDzG7WT/IMG-6260.jpg",
    "https://i.ibb.co/P51T1mj/IMG-6261.jpg",
    "https://i.ibb.co/j8vf1LW/IMG-6266.jpg",
    "https://i.ibb.co/Sc3Frkv/IMG-6272.jpg",
    "https://i.ibb.co/WBRHXxQ/IMG-6276.jpg",
    "https://i.ibb.co/YbnLmCQ/IMG-6278.jpg",
    "https://i.ibb.co/7bNHZRm/IMG-6296.jpg",
    "https://i.ibb.co/Ph0CT3P/IMG-6297.jpg",
    "https://i.ibb.co/8mxjVMx/IMG-6298.jpg",
    "https://i.ibb.co/sWywgMn/IMG-6295.jpg",
  ];

  readonly secondProductImages = [ // спортивные
    "https://i.ibb.co/DVRtb9c/IMG-6382.jpg",
    "https://i.ibb.co/j4qY79r/IMG-6383.jpg",
    "https://i.ibb.co/Rz6x01F/IMG-6384.jpg",
  ];

  readonly thirdProductImages = [ // пиджаки
    "https://i.ibb.co/cQKpTBH/IMG-6258.jpg",
  ];

  readonly firstCostumeProductImages = [ // пиджаки
    "https://i.ibb.co/kcD9vpz/DSCF5386.jpg",
    "https://i.ibb.co/L0zRmqn/DSCF5393.jpg",
    "https://i.ibb.co/RSKSz6h/DSCF5389.jpg",
    "https://i.ibb.co/gmTqy1s/DSCF5384.jpg",
    "https://i.ibb.co/jyDgdXt/DSCF5380.jpg",
    "https://i.ibb.co/JzJxDvP/DSCF5377.jpg",
    "https://i.ibb.co/smjvWjD/DSCF5376.jpg",
    "https://i.ibb.co/0FfQ0N9/DSCF5372.jpg",
    "https://i.ibb.co/ZmWtBH5/DSCF5369.jpg",
    "https://i.ibb.co/yf2n9V2/DSCF5368.jpg"
  ]

  readonly fourthProductImages = [ // блузы
    "https://i.ibb.co/3Cbgdqq/DSCF4286.webp",
    "https://i.ibb.co/XZd58Bg/DSCF4263.webp",
    "https://i.ibb.co/jzVgFSy/DSCF4260.webp",
    "https://i.ibb.co/RSPcJD2/DSCF4346.webp",
    "https://i.ibb.co/kKHf01K/DSCF4333.webp",
    "https://i.ibb.co/s9R5wfm/DSCF4328.webp",
    "https://i.ibb.co/YWN4bRR/DSCF4321.webp",
    "https://i.ibb.co/5s2jZtm/DSCF4288.webp",
    "https://i.ibb.co/GsQKMb2/DSCF4290.webp",
    "https://i.ibb.co/yBNFHWj/DSCF4311.webp",
    "https://i.ibb.co/7X5LwXb/DSCF4313.webp",
    "https://i.ibb.co/1fHs2qm/DSCF4318.webp",
  ];

  readonly secondSportsImages = [
    "https://i.ibb.co/4grPfRx/DSCF4912.jpg",
    "https://i.ibb.co/gDsBwQ4/DSCF4918.jpg",
    "https://i.ibb.co/P9Y2RFC/DSCF4910.jpg",
    "https://i.ibb.co/CQQYFqh/DSCF4899.jpg",
    "https://i.ibb.co/8Dtnn2g/DSCF4898.jpg",
    "https://i.ibb.co/k6wLXGk/DSCF4896.jpg",
    "https://i.ibb.co/1b41Kyj/DSCF4877.jpg",
    "https://i.ibb.co/h2JnZXT/DSCF4878.jpg",
    "https://i.ibb.co/Pw2YqkZ/DSCF4882.jpg",
    "https://i.ibb.co/kHsdHQC/DSCF4886.jpg",
    "https://i.ibb.co/7tt3J0y/DSCF4888.jpg",
    "https://i.ibb.co/kKK9gCR/DSCF4890.jpg",
    "https://i.ibb.co/ZM4jDMH/DSCF4892.jpg",
    "https://i.ibb.co/tPsbXv0/DSCF4895.jpg",
    "https://i.ibb.co/pzPmRwm/DSCF4873.jpg",
    "https://i.ibb.co/qybdFGX/DSCF4929.jpg",
    "https://i.ibb.co/c6Q3N5m/DSCF4879.jpg",
    "https://i.ibb.co/stPLndK/DSCF4932.jpg",
    "https://i.ibb.co/SBMMFMQ/DSCF4931.jpg",
    "https://i.ibb.co/VJRjTbp/DSCF4926.jpg",
    "https://i.ibb.co/7n0McLn/DSCF4921.jpg"
  ];

  readonly secondBlazerImages = [
    "https://i.ibb.co/ZTMRmJb/DSCF4676.jpg",
    "https://i.ibb.co/Ksr1Cxg/DSCF4675.jpg",
    "https://i.ibb.co/m82zffZ/DSCF4674.jpg",
    "https://i.ibb.co/GPp2c3B/DSCF4681.jpg",
    "https://i.ibb.co/g7mCFk1/DSCF4688.jpg",
    "https://i.ibb.co/ggqT1cZ/DSCF4682.jpg"
  ];

  readonly secondCostumesImages = [
    "https://i.ibb.co/Sxrt0Cq/IMG-2764.jpg",
    "https://i.ibb.co/KmBBvtn/IMG-2768.jpg",
    "https://i.ibb.co/hHZKCXw/IMG-2833.jpg"
  ];

  readonly thirdCostumesImages = [
    "https://i.ibb.co/NsByYTB/DSCF5644.jpg",
    "https://i.ibb.co/gRXRZ6s/DSCF5643.jpg",
    "https://i.ibb.co/d0Jrf68/DSCF5641.jpg",
    "https://i.ibb.co/sHmvfy3/DSCF5635.jpg",
    "https://i.ibb.co/5BgY023/DSCF5634.jpg",
    "https://i.ibb.co/vmsMYrW/DSCF5636.jpg",
    "https://i.ibb.co/7NN0GT4/DSCF5659.jpg",
    "https://i.ibb.co/4VyC0YF/DSCF5658-1.jpg"
  ];

  readonly firstTrousersImages = [
    "https://i.ibb.co/w4CWLKS/DSCF4973.webp",
    "https://i.ibb.co/Cb2zdYP/DSCF4974.webp",
    "https://i.ibb.co/SPwbHTx/DSCF4979.webp",
    "https://i.ibb.co/TTSpvHV/DSCF4965.webp",
    "https://i.ibb.co/SJCr49s/DSCF4942.webp",
    "https://i.ibb.co/dc56vHK/DSCF4972.webp"
  ];

  readonly secondDressesImages = [
    "https://i.ibb.co/LC1Vzz2/IMG-7451.jpg",
    "https://i.ibb.co/55gv7Jq/IMG-7444.jpg",
    "https://i.ibb.co/YRKSLX9/IMG-7450.jpg",
    "https://i.ibb.co/XJs9ZMB/IMG-7445.jpg",
    "https://i.ibb.co/MkSxg2B/IMG-7460.jpg",
    "https://i.ibb.co/J2X8pH2/IMG-7454.jpg",
    "https://i.ibb.co/4mS5B1g/IMG-7453.jpg",
    "https://i.ibb.co/jWjx86g/IMG-7452.jpg"
  ];

  readonly fourthCostumesImages = [
    "https://i.ibb.co/SJZb4z4/IMG-2956.jpg",
    "https://i.ibb.co/9TZyPGs/IMG-2969.jpg",
    "https://i.ibb.co/B3YY75J/IMG-2986.jpg",
    "https://i.ibb.co/gThs9TB/IMG-2954.jpg",
    "https://i.ibb.co/mCmT7fq/IMG-2955.jpg"
  ];
}
