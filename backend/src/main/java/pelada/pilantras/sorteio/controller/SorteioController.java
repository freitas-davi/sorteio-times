package pelada.pilantras.sorteio.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pelada.pilantras.sorteio.dto.SorteioRequestDTO;
import pelada.pilantras.sorteio.dto.SorteioResponseDTO;
import pelada.pilantras.sorteio.service.SorteioService;

@RestController
@RequestMapping("/sorteio")
@RequiredArgsConstructor
public class SorteioController {

    private final SorteioService sorteioService;

    @PostMapping
    public ResponseEntity<SorteioResponseDTO> sortearTimes(
            @RequestBody SorteioRequestDTO sorteioRequestDTO
    ) {
        SorteioResponseDTO response = sorteioService.sortear(sorteioRequestDTO);
        return ResponseEntity.ok(response);
    }

}
