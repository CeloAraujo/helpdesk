import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.html",
  styleUrls: ["./cliente-create.css"],
})
export class ClienteCreateComponent implements OnInit {
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(3)]],
      cpf: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(3)]],
      perfis: [[]],
      dataCriacao: [""],
    });
  }

  create(): void {
    if (this.clienteForm.valid) {
      this.service.create(this.clienteForm.value).subscribe(
        () => {
          this.toast.success("Cliente cadastrado com sucesso", "Cadastro");
          this.router.navigate(["clientes"]);
        },
        (ex) => {
          this.toast.error(ex.error.message);
        }
      );
    }
  }

  addPerfil(perfil: any): void {
    const perfis = this.clienteForm.get("perfis").value;
    if (perfis.includes(perfil)) {
      perfis.splice(perfis.indexOf(perfil), 1);
    } else {
      perfis.push(perfil);
    }
    this.clienteForm.get("perfis").setValue(perfis);
  }

  validaCampos(): boolean {
    return this.clienteForm.valid;
  }
}
