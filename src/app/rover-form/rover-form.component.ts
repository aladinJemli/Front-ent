import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDService } from '../services/crud.service';

@Component({
  selector: 'app-rover-form',
  templateUrl: './rover-form.component.html',
  styleUrls: ['./rover-form.component.scss']
})
export class RoverFormComponent implements OnInit {
  alert = [];
  execution = [];
  resultRover = [];
  roverListForm: FormGroup = this.createRoversList();
  validPlateau = false;
  @HostListener('click')
  clickout() {
    this.alert = [];
  }
  constructor(private fb: FormBuilder,
              private crudService: CRUDService) { }

  ngOnInit() {}

  get roversList() {
    return this.roverListForm.get('roversList') as FormArray;
  }

  get x() {
    return this.roverListForm.get('x');
  }

  get y() {
    return this.roverListForm.get('y');
  }

  createRover(form?): FormGroup {
    return this.fb.group(
      { xPosition: ['', Validators.required],
        yPosition: ['', Validators.required],
        direction: ['', [Validators.required, Validators.pattern(/[ENWS]+$/)]],
        insrtuctions: ['', [Validators.required, Validators.pattern(/[MRL]+$/)]]
      }
    );
  }

  createRoversList(form?): FormGroup {
    return this.fb.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
      roversList: this.fb.array([])
    });
  }

  addRove() {
    this.roversList.push(this.createRover());
  }

  removeRover() {
    this.roversList.removeAt(this.roversList.length - 1);
  }

  deleteRover(i) {
    this.roversList.removeAt(i);
    this.execution.splice(this.execution[i - 1], 1);
  }
   /*number validator*/
   addNumber(e, mode) {
    const pattern = /^[0-9]*$/;
    const checkNumber = [];
    const inputChar = e.key;
    if (mode == 1) {
      if (!pattern.test(inputChar)) {
        checkNumber[0] = 'Vous ne pouvez saisir que des chiffres';
      }
      if (pattern.test(inputChar)) { checkNumber[0] = ''; }
      this.alert[0] = checkNumber;
    } else if (mode == 2) {
      if (!pattern.test(inputChar)) {
        checkNumber[1] = 'Vous ne pouvez saisir que des chiffres';
      }
      if (pattern.test(inputChar)) { checkNumber[1] = ''; }
      this.alert[1] = checkNumber[1];
    }
    if (this.x.valid && this.y.valid) {
      this.validPlateau = true;
  } else {
    this.validPlateau = false;
  }
  }

  // KeyPress Input number
  keyPress(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  runRover(row, i) {
    let inst = '';
    for (let j = 0; j < row.value.insrtuctions.length; j++){
      if (row.value.insrtuctions[j] == "M"){
        inst += 'M';
      } else if (row.value.insrtuctions[j] == 'R') {
        inst += 'R';
      } else if (row.value.insrtuctions[j] == 'L') {
        inst += 'L';
      }
    }
    const body = {
      "x": this.x.value,
      "y": this.y.value,
      "xPosition": row.value.xPosition,
      "yPosition": row.value.yPosition,
      "instruction": inst,
      "direction": row.value.direction
    };
    this.crudService
    .add(body)
    .subscribe(
      result => {
        this.executionTest(i);
        this.crudService.getRover().subscribe(res => {
          console.log(res.xPosition + " " + res.yPosition + " " + res.direction);
          this.resultRover.push(res.xPosition + " " + res.yPosition + " " + res.direction);
      }
      );
      });
  }

  executionTest(i) {
    this.execution[i] = true;
  }
}
