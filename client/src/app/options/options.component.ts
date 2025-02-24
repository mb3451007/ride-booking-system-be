import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'; // Import reactive forms modules

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  formElements: any[] = [];
  formHTML: SafeHtml = '';
  selectedElementIndex: number | null = null;

  @ViewChild('formContainer', { static: false }) formContainer!: ElementRef;
  @ViewChild('htmlOutput', { static: false }) htmlOutput!: ElementRef;


  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer, private renderer: Renderer2) {
    this.form = this.fb.group({}); // Initialize the form group
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
  
  addElement(type: string, customHtml?: string) {
    const newControl = new FormControl('');
    const controlName = 'field' + this.formElements.length;
    this.form.addControl(controlName, newControl);
  
    if (customHtml) {
      this.formElements.push({ type: 'custom', controlName, customHtml });
    } else {
      this.formElements.push({ type, controlName });
    }
  }

  removeElement(index: number) {
    const controlName = this.formElements[index].controlName;
    this.form.removeControl(controlName); // Remove from the form group
    this.formElements.splice(index, 1);

    if (this.selectedElementIndex === index) {
      this.selectedElementIndex = null;
    } else if (this.selectedElementIndex !== null && this.selectedElementIndex > index) {
      this.selectedElementIndex--;
    }
  }


  selectElement(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const elementDiv = target.closest('[data-index]');
    if (elementDiv) {
      this.selectedElementIndex = parseInt(elementDiv.getAttribute('data-index')!, 10);
    } else {
      this.selectedElementIndex = null;
    }
  }

  getFormHTML() {
    let html = '<form [formGroup]="form">'; // Bind to the form group
    this.formElements.forEach((element, i) => {
      let inputHTML = '';
      const formControlName = element.controlName; // Get the control name

      if (element.customHtml) {
        // Use custom HTML if provided, but still bind to the form control
        inputHTML = element.customHtml.replace(/name=".*?"/, `name="${formControlName}" formControlName="${formControlName}"`);
      } else {
        switch (element.type) {
          case 'text':
            inputHTML = `<input type="text" name="${formControlName}" formControlName="${formControlName}" placeholder="Text Field">`;
            break;
          case 'email':
            inputHTML = `<input type="email" name="${formControlName}" formControlName="${formControlName}" placeholder="Email Field">`;
            break;
          case 'number':
            inputHTML = `<input type="number" name="${formControlName}" formControlName="${formControlName}" placeholder="Number Field">`;
            break;
          case 'textarea':
            inputHTML = `<textarea name="${formControlName}" formControlName="${formControlName}" placeholder="Text Area"></textarea>`;
            break;
          case 'select':
            inputHTML = `<select name="${formControlName}" formControlName="${formControlName}"><option value="option1">Option 1</option><option value="option2">Option 2</option></select>`;
            break;
          case 'checkbox':
            inputHTML = `<input type="checkbox" name="${formControlName}" formControlName="${formControlName}">`;
            break;
        }
      }

      html += inputHTML + '<br>';
    });
    html += '</form>';

    this.formHTML = this.sanitizer.bypassSecurityTrustHtml(html);
    this.htmlOutput.nativeElement.value = html;
  }
}