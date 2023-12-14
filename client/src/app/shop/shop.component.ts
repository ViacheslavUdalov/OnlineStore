import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShopService} from "./shop.service";
import {IProduct} from "../shared/models/product";
import {IPagination} from "../shared/models/pagination";
import {IBrand} from "../shared/models/brands";
import {IType} from "../shared/models/productType";
import {ShopParams} from "../shared/models/shopParams";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  @ViewChild("search", {static: true}) searchTerm: ElementRef;
  products : IProduct[]
  brands: IBrand[]
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name:'Price Low to High', value: 'priceAsc'},
    {name: 'Price High to Low', value: 'priceDesc'}
  ]
  constructor(private shopService: ShopService) {

  }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
}
getProducts() {
  this.shopService.getProducts(this.shopParams).subscribe((response) => {
    this.products = response.data;
    this.shopParams.pageNumber = response.pageIndex;
    this.shopParams.pageSize = response.pageSize;
this.totalCount = response.count;
  })
}
  getBrands() {
    this.shopService.getBrands().subscribe((response) => {
      // для того, чтобы показывалась категория все бренды;
      this.brands = [{id: 0, name: "All"}, ...response];
    }, error => {
      console.log(error)
    })
  }
  getTypes() {
    this.shopService.getTypes().subscribe((response) => {
      // для того, чтобы показывалась категория все типы;
      this.types = [{id: 0, name: "All"}, ...response];
    }, error => {
      console.log(error)
    })
  }
  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortedSelected(sort: string) {
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event.page;
      this.getProducts();
    }
  }
onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
  this.shopParams.pageNumber = 1;
    this.getProducts();
}
onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
}
}
