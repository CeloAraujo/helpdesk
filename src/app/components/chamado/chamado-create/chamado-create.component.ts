import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-create.component.html",
  styleUrls: ["./chamado-create.component.css"],
})
export class ChamadoCreateComponent implements OnInit {
  chamadoForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.chamadoForm = this.fb.group({
      prioridade: this.fb.control(null, [Validators.required]),
      status: this.fb.control(null, [Validators.required]),
      titulo: this.fb.control(null, [Validators.required]),
      observacoes: this.fb.control(null, [Validators.required]),
      tecnico: this.fb.control(null, [Validators.required]),
      cliente: this.fb.control(null, [Validators.required]),
    });
  }

  validaCampos(): boolean {
    return this.chamadoForm.valid;
  }
}
