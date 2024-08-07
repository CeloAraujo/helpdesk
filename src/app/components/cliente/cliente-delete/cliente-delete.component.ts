import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: 'app-cliente-delete',
  templateUrl:'./cliente-delete.component.html', 
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
  clienteForm: FormGroup;
  clienteId: string;

  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    (this.clienteId = this.route.snapshot.paramMap.get("id")),
      (this.clienteForm = this.fb.group({
        nome: [{value:"",disabled:true}, [Validators.required, Validators.minLength(3)]],
        cpf: [{value:"",disabled:true},[Validators.required]],
        email: [{value:"",disabled:true}, [Validators.required, Validators.email]],
        senha: [{value:"",disabled:true}, [Validators.required, Validators.minLength(3)]],
        perfis: [{value:[],disabled:true},],
        dataCriacao: [{value:"",disabled:true}],
      }));

    this.findById();
  }

  findById(): void {
    this.service
      .findById(this.clienteId, this.clienteForm.value)
      .subscribe(cliente => {
        cliente.perfis=[]
        this.clienteForm.patchValue(cliente);
      }), error => {
        this.toast.error('Erro ao carregar os dados do cliente');
        console.error(error);
      };
  }

  delete(): void { 
      this.service.delete(this.clienteId).subscribe(
        () => {
          this.toast.success("Cliente deletado com sucesso", "Delete");
          this.router.navigate(["clientes"]);
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

  addPerfil(perfil: any): void {
    const perfis = this.clienteForm.get("perfis").value;
    if (perfis.includes(perfil)) {
      perfis.splice(perfis.indexOf(perfil), 1);
    } else {
      perfis.push(perfil);
    }
    this.clienteForm.get("perfis").setValue(perfis);
  }
}
