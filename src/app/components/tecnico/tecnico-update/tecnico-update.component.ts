import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-update",
  templateUrl: "./tecnico-update.component.html",
  styleUrls: ["./tecnico-update.component.css"],
})
export class TecnicoUpdateComponent implements OnInit {
  tecnicoForm: FormGroup;
  tecnicoId: string;

  constructor(
    private fb: FormBuilder,
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    (this.tecnicoId = this.route.snapshot.paramMap.get("id")),
      (this.tecnicoForm = this.fb.group({
        nome: ["", [Validators.required, Validators.minLength(3)]],
        cpf: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        senha: ["", [Validators.required, Validators.minLength(3)]],
        perfis: [[]],
        dataCriacao: [""],
      }));

    this.findById();
  }

  findById(): void {
    this.service
      .findById(this.tecnicoId, this.tecnicoForm.value)
      .subscribe(tecnico => {
        tecnico.perfis=[]
        this.tecnicoForm.patchValue(tecnico);
      }), error => {
        this.toast.error('Erro ao carregar os dados do técnico');
        console.error(error);
      };
  }

  update(): void {
    if (this.tecnicoForm.valid) {
      this.service.update(this.tecnicoId,this.tecnicoForm.value).subscribe(
        () => {
          this.toast.success("Técnico atualizado com sucesso", "Update");
          this.router.navigate(["tecnicos"]);
        },
        (ex) => {
          console.log(ex);
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
