import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";
import { Tecnico } from "src/app/models/tecnico";
import { ChamadoService } from "src/app/services/chamado.service";
import { ClienteService } from "src/app/services/cliente.service";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-update.component.html",
  styleUrls: ["./chamado-update.component.css"],
})
export class ChamadoUpdateComponent implements OnInit {
  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
    nomeCliente: "",
    nomeTecnico: "",
  };

  chamadoForm: FormGroup;
  clientes: Cliente[];
  tecnicos: Tecnico[];
  valoresIniciais: {
    id?: any;
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: string;
    status: string;
    titulo: string;
    observacoes: string;
    tecnico: string;
    cliente: string;
    nomeCliente: string;
    nomeTecnico: string;
  };

  constructor(
    private fb: FormBuilder,
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService
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

    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();

    this.chamadoForm.valueChanges.subscribe(() => {
      this.validaCampos(); // Chama validaCampos ao modificar qualquer valor
    });
  }
  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(
      (resposta) => {
        this.chamado = resposta;
        this.chamadoForm.patchValue(this.chamado); 
        console.log(this.chamadoForm.value);
        this.valoresIniciais = { ...this.chamadoForm.value };
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }
  update(): void {
    if (this.chamadoForm.valid) {
      this.chamadoService
        .update(this.chamado.id, this.chamadoForm.value)
        .subscribe(
          () => {
            this.toast.success("Chamado atualizado com sucesso", "Cadastro");
            this.router.navigate(["chamados"]);
          },
          (ex) => {
            this.toast.error(ex.error.message);
          }
        );
    }
  }
  findAllClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
    });
  }

  retornaStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "EM ANDAMENTO";
    } else {
      return "ENCERRADO";
    }
  }
  retornaPrioridade(prioridade: any): string {
    const prioridadeStr = prioridade.toString(); 
    if (prioridadeStr === "0") {
      return "BAIXA";
    } else if (prioridadeStr === "1") {
      return "MÉDIA";
    } else {
      return "ALTA";
    }
}

  validaCampos(): boolean {
    if (!this.valoresIniciais) {
      return false;
    }
    const foiModificado = Object.keys(this.chamadoForm.controls).some(key => 
      this.chamadoForm.get(key).value !== this.valoresIniciais[key]
    );
    return this.chamadoForm.valid && foiModificado;
  }
}
