import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-create",
  templateUrl: "./tecnico-create.html",
  styleUrls: ["./tecnico-create.css"],
})
export class TecnicoCreateComponent implements OnInit {
  tecnicoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tecnicoForm = this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(3)]],
      cpf: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(3)]],
      perfis: [[]],
      dataCriacao: [""],
    });
  }

  create(): void {
    if (this.tecnicoForm.valid) {
      this.service.create(this.tecnicoForm.value).subscribe(
        () => {
          this.toast.success("Técnico cadastrado com sucesso", "Cadastro");
          this.router.navigate(["tecnicos"]);
        },ex => {
          console.log(ex)
          if (ex.error.errors) {
            ex.error.errors.forEach((element) => {
              this.toast.error(element.message);
            });
          } else {
            this.toast.error(ex.error.message);
           
          }
        }
      );
    }
  }

  addPerfil(perfil: any): void {
    const perfis = this.tecnicoForm.get("perfis").value;
    if (perfis.includes(perfil)) {
      perfis.splice(perfis.indexOf(perfil), 1);
    } else {
      perfis.push(perfil);
    }
    this.tecnicoForm.get("perfis").setValue(perfis);
  }

  validaCampos(): boolean {
    return this.tecnicoForm.valid;
  }
}
