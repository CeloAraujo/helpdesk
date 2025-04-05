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
        console.log(tecnico);  
        this.tecnicoForm.patchValue(tecnico);  
        console.log("aqui", this.tecnicoForm.value);  
      }, error => {
        this.toast.error('Erro ao carregar os dados do técnico');
        console.error(error);
      });
  }
  

  update(): void {
    if (this.tecnicoForm.valid) {
      let perfis = this.tecnicoForm.get("perfis").value;
  
      if (Array.isArray(perfis)) {
        perfis = perfis.map(perfil => {
          if (typeof perfil === 'string') {
            return this.mapPerfilToNumber(perfil);
          }
          return perfil;
        });
      }
  
      this.tecnicoForm.get("perfis").setValue(perfis);
  
      this.service.update(this.tecnicoId, this.tecnicoForm.value).subscribe(
        () => {
          this.toast.success("Técnico atualizado com sucesso", "Update");
          this.router.navigate(["tecnicos"]);
        },
        (ex) => {
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
  mapPerfilToNumber(perfil: string): number {
    switch (perfil) {
      case 'ADMIN':
        return 0;
      case 'CLIENTE':
        return 1;
      case 'TECNICO':
        return 2;
      default:
        return 1;
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
