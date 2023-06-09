import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MadeByBrianComponent } from "./made-by-brian.component";

describe("MadeByBrianComponent", () => {
	let component: MadeByBrianComponent;
	let fixture: ComponentFixture<MadeByBrianComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MadeByBrianComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MadeByBrianComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
