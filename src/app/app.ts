import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Optica Boops');
  formulario!: FormGroup;
  submitted = false;
  fechaMinima: string = '';

  provincias: { [key: string]: string } = {
    '01': 'Álava', '02': 'Albacete', '03': 'Alicante', '04': 'Almería',
    '05': 'Ávila', '06': 'Badajoz', '07': 'Baleares', '08': 'Barcelona',
    '09': 'Burgos', '10': 'Cáceres', '11': 'Cádiz', '12': 'Castellón',
    '13': 'Ciudad Real', '14': 'Córdoba', '15': 'Coruña', '16': 'Cuenca',
    '17': 'Gerona', '18': 'Granada', '19': 'Guadalajara', '20': 'Guipúzcoa',
    '21': 'Huelva', '22': 'Huesca', '23': 'Jaén', '24': 'León',
    '25': 'Lérida', '26': 'La Rioja', '27': 'Lugo', '28': 'Madrid',
    '29': 'Málaga', '30': 'Murcia', '31': 'Navarra', '32': 'Orense',
    '33': 'Asturias', '34': 'Palencia', '35': 'Las Palmas', '36': 'Pontevedra',
    '37': 'Salamanca', '38': 'Santa Cruz de Tenerife', '39': 'Cantabria', '40': 'Segovia',
    '41': 'Sevilla', '42': 'Soria', '43': 'Tarragona', '44': 'Teruel',
    '45': 'Toledo', '46': 'Valencia', '47': 'Valladolid', '48': 'Vizcaya',
    '49': 'Zamora', '50': 'Zaragoza', '51': 'Ceuta', '52': 'Melilla'
  };

  dolencias: string[] = [
    'Miopía',
    'Astigmatismo',
    'Ojos cansados',
    'Hipermetropía'
  ];

  constructor(private fb: FormBuilder) {
    this.calcularFechaMinima();
    this.initForm();
  }

  calcularFechaMinima() {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    this.fechaMinima = hoy.toISOString().split('T')[0];
  }

  initForm() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefono: ['', [this.validarTelefono.bind(this)]],
      cp: ['', [Validators.required, Validators.pattern(/^\d{5}$/), this.validarCP.bind(this)]],
      provincia: [{ value: '', disabled: true }],
      tipoProducto: ['gafas', Validators.required],
      dolencias: [[], Validators.required],
      fechaDeseada: ['', [Validators.required, this.validarFecha.bind(this)]],
      comentarios: ['', [Validators.maxLength(250)]],
      aceptarCondiciones: [false, Validators.requiredTrue]
    });

    this.formulario.get('cp')?.valueChanges.subscribe(cp => {
      this.actualizarProvincia(cp);
    });
  }

  validarTelefono(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const telefonoPattern = /^[6-9]\d{8}$/;
    return telefonoPattern.test(control.value) ? null : { telefonoInvalido: true };
  }

  validarCP(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const cp = control.value;
    if (!/^\d{5}$/.test(cp)) return { cpInvalido: true };
    const prefijo = cp.substring(0, 2);
    return this.provincias[prefijo] ? null : { provinciaNoExiste: true };
  }

  validarFecha(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const fechaSeleccionada = new Date(control.value);
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    manana.setHours(0, 0, 0, 0);
    return fechaSeleccionada >= manana ? null : { fechaInvalida: true };
  }

  actualizarProvincia(cp: string) {
    if (cp && cp.length >= 2) {
      const prefijo = cp.substring(0, 2);
      const provincia = this.provincias[prefijo] || '';
      this.formulario.patchValue({ provincia: provincia }, { emitEvent: false });
    } else {
      this.formulario.patchValue({ provincia: '' }, { emitEvent: false });
    }
  }

  onDolenciasChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
    this.formulario.patchValue({ dolencias: selectedOptions });
  }

  get f() {
    return this.formulario.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formulario.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  getFieldError(fieldName: string): string {
    const field = this.formulario.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Este campo es obligatorio';
    if (field.errors['email']) return 'Email inválido';
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['maxlength']) return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
    if (field.errors['pattern']) return 'Formato inválido';
    if (field.errors['telefonoInvalido']) return 'Teléfono debe empezar por 6-9 y tener 9 dígitos';
    if (field.errors['cpInvalido']) return 'El código postal debe tener 5 dígitos';
    if (field.errors['provinciaNoExiste']) return 'El código postal no corresponde a ninguna provincia';
    if (field.errors['fechaInvalida']) return 'La fecha debe ser a partir de mañana';

    return 'Error de validación';
  }

  validarFormulario(): string[] {
    const errores: string[] = [];
    Object.keys(this.formulario.controls).forEach(key => {
      const control = this.formulario.get(key);
      if (control && control.invalid) {
        const error = this.getFieldError(key);
        if (error) {
          errores.push(`${this.getNombreCampo(key)}: ${error}`);
        }
      }
    });
    return errores;
  }

  getNombreCampo(fieldName: string): string {
    const nombres: { [key: string]: string } = {
      'nombre': 'Nombre',
      'email': 'Email',
      'telefono': 'Teléfono',
      'cp': 'Código Postal',
      'provincia': 'Provincia',
      'tipoProducto': 'Tipo de Producto',
      'dolencias': 'Dolencias',
      'fechaDeseada': 'Fecha deseada',
      'comentarios': 'Comentarios',
      'aceptarCondiciones': 'Aceptar condiciones'
    };
    return nombres[fieldName] || fieldName;
  }

  onSubmit() {
    this.submitted = true;

    if (this.formulario.invalid) {
      const errores = this.validarFormulario();
      this.mostrarModalErrores(errores);
      return;
    }

    this.mostrarModalExito();
  }

  mostrarModalErrores(errores: string[]) {
    const modalElement = document.getElementById('modalErrores');
    const listaErrores = document.getElementById('listaErrores');
    if (listaErrores) {
      listaErrores.innerHTML = errores.map(error => 
        `<div class="alert alert-danger mb-2">${error}</div>`
      ).join('');
    }
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  mostrarModalExito() {
    const modalElement = document.getElementById('modalExito');
    const datosEnviados = document.getElementById('datosEnviados');
    if (datosEnviados) {
      const datos = this.formulario.getRawValue();
      datosEnviados.innerHTML = `
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Email:</strong> ${datos.email}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono || 'No proporcionado'}</p>
        <p><strong>Código Postal:</strong> ${datos.cp}</p>
        <p><strong>Provincia:</strong> ${datos.provincia}</p>
        <p><strong>Producto:</strong> ${datos.tipoProducto === 'gafas' ? 'Gafas' : 'Lentes de contacto'}</p>
        <p><strong>Dolencias:</strong> ${datos.dolencias.join(', ')}</p>
        <p><strong>Fecha deseada:</strong> ${datos.fechaDeseada}</p>
        <p><strong>Comentarios:</strong> ${datos.comentarios || 'Sin comentarios'}</p>
      `;
    }
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  mostrarModalCondiciones() {
    const modalElement = document.getElementById('modalCondiciones');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  resetForm() {
    this.submitted = false;
    this.formulario.reset({
      tipoProducto: 'gafas',
      dolencias: [],
      aceptarCondiciones: false
    });
  }
}
