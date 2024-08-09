import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";
import { ClienteService } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-create.component.html",
  styleUrls: ["./chamado-create.component.css"],
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  chamadoForm: FormGroup;
  clientes:Cliente[]
  tecnicos:Tecnico[]

  constructor(
    private fb: FormBuilder,
    private service: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chamadoForm = this.fb.group({
      prioridade: this.fb.control(null, [Validators.required]),
      status: this.fb.control(null, [Validators.required]),
      titulo: this.fb.control(null, [Validators.required]),
      observacoes: this.fb.control(null, [Validators.required]),
      tecnico: this.fb.control(null, [Validators.required]),
      cliente: this.fb.control(null, [Validators.required]),
    });

    this.findAllClientes()
    this.findAllTecnicos()
  }

  create(): void {
    if (this.chamadoForm.valid) {
      this.service.create(this.chamadoForm.value).subscribe(
        () => {
          this.toast.success("Chamado cadastrado com sucesso", "Cadastro");
          this.router.navigate(["chamados"]);
        },
        (ex) => {
          this.toast.error(ex.error.message);
        }
      );
    }
  }
  findAllClientes():void{
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }
  findAllTecnicos():void{
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }
  validaCampos(): boolean {
    return this.chamadoForm.valid;
  }
}
