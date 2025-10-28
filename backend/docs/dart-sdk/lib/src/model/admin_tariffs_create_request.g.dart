// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_tariffs_create_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminTariffsCreateRequest extends AdminTariffsCreateRequest {
  @override
  final String city;
  @override
  final bool? active;
  @override
  final num baseFareUsd;
  @override
  final num perKmUsd;
  @override
  final num perMinUsd;
  @override
  final num? minFareUsd;
  @override
  final num? nightMultiplier;
  @override
  final num? weekendMultiplier;
  @override
  final num? surgeMultiplier;
  @override
  final int? nightStartHour;
  @override
  final int? nightEndHour;
  @override
  final int? cancellationGraceSec;
  @override
  final num? cancellationFeeAcceptedUsd;
  @override
  final num? cancellationFeeArrivedUsd;
  @override
  final String? notes;
  @override
  final bool? deactivateOld;

  factory _$AdminTariffsCreateRequest(
          [void Function(AdminTariffsCreateRequestBuilder)? updates]) =>
      (AdminTariffsCreateRequestBuilder()..update(updates))._build();

  _$AdminTariffsCreateRequest._(
      {required this.city,
      this.active,
      required this.baseFareUsd,
      required this.perKmUsd,
      required this.perMinUsd,
      this.minFareUsd,
      this.nightMultiplier,
      this.weekendMultiplier,
      this.surgeMultiplier,
      this.nightStartHour,
      this.nightEndHour,
      this.cancellationGraceSec,
      this.cancellationFeeAcceptedUsd,
      this.cancellationFeeArrivedUsd,
      this.notes,
      this.deactivateOld})
      : super._();
  @override
  AdminTariffsCreateRequest rebuild(
          void Function(AdminTariffsCreateRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminTariffsCreateRequestBuilder toBuilder() =>
      AdminTariffsCreateRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminTariffsCreateRequest &&
        city == other.city &&
        active == other.active &&
        baseFareUsd == other.baseFareUsd &&
        perKmUsd == other.perKmUsd &&
        perMinUsd == other.perMinUsd &&
        minFareUsd == other.minFareUsd &&
        nightMultiplier == other.nightMultiplier &&
        weekendMultiplier == other.weekendMultiplier &&
        surgeMultiplier == other.surgeMultiplier &&
        nightStartHour == other.nightStartHour &&
        nightEndHour == other.nightEndHour &&
        cancellationGraceSec == other.cancellationGraceSec &&
        cancellationFeeAcceptedUsd == other.cancellationFeeAcceptedUsd &&
        cancellationFeeArrivedUsd == other.cancellationFeeArrivedUsd &&
        notes == other.notes &&
        deactivateOld == other.deactivateOld;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, city.hashCode);
    _$hash = $jc(_$hash, active.hashCode);
    _$hash = $jc(_$hash, baseFareUsd.hashCode);
    _$hash = $jc(_$hash, perKmUsd.hashCode);
    _$hash = $jc(_$hash, perMinUsd.hashCode);
    _$hash = $jc(_$hash, minFareUsd.hashCode);
    _$hash = $jc(_$hash, nightMultiplier.hashCode);
    _$hash = $jc(_$hash, weekendMultiplier.hashCode);
    _$hash = $jc(_$hash, surgeMultiplier.hashCode);
    _$hash = $jc(_$hash, nightStartHour.hashCode);
    _$hash = $jc(_$hash, nightEndHour.hashCode);
    _$hash = $jc(_$hash, cancellationGraceSec.hashCode);
    _$hash = $jc(_$hash, cancellationFeeAcceptedUsd.hashCode);
    _$hash = $jc(_$hash, cancellationFeeArrivedUsd.hashCode);
    _$hash = $jc(_$hash, notes.hashCode);
    _$hash = $jc(_$hash, deactivateOld.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AdminTariffsCreateRequest')
          ..add('city', city)
          ..add('active', active)
          ..add('baseFareUsd', baseFareUsd)
          ..add('perKmUsd', perKmUsd)
          ..add('perMinUsd', perMinUsd)
          ..add('minFareUsd', minFareUsd)
          ..add('nightMultiplier', nightMultiplier)
          ..add('weekendMultiplier', weekendMultiplier)
          ..add('surgeMultiplier', surgeMultiplier)
          ..add('nightStartHour', nightStartHour)
          ..add('nightEndHour', nightEndHour)
          ..add('cancellationGraceSec', cancellationGraceSec)
          ..add('cancellationFeeAcceptedUsd', cancellationFeeAcceptedUsd)
          ..add('cancellationFeeArrivedUsd', cancellationFeeArrivedUsd)
          ..add('notes', notes)
          ..add('deactivateOld', deactivateOld))
        .toString();
  }
}

class AdminTariffsCreateRequestBuilder
    implements
        Builder<AdminTariffsCreateRequest, AdminTariffsCreateRequestBuilder> {
  _$AdminTariffsCreateRequest? _$v;

  String? _city;
  String? get city => _$this._city;
  set city(String? city) => _$this._city = city;

  bool? _active;
  bool? get active => _$this._active;
  set active(bool? active) => _$this._active = active;

  num? _baseFareUsd;
  num? get baseFareUsd => _$this._baseFareUsd;
  set baseFareUsd(num? baseFareUsd) => _$this._baseFareUsd = baseFareUsd;

  num? _perKmUsd;
  num? get perKmUsd => _$this._perKmUsd;
  set perKmUsd(num? perKmUsd) => _$this._perKmUsd = perKmUsd;

  num? _perMinUsd;
  num? get perMinUsd => _$this._perMinUsd;
  set perMinUsd(num? perMinUsd) => _$this._perMinUsd = perMinUsd;

  num? _minFareUsd;
  num? get minFareUsd => _$this._minFareUsd;
  set minFareUsd(num? minFareUsd) => _$this._minFareUsd = minFareUsd;

  num? _nightMultiplier;
  num? get nightMultiplier => _$this._nightMultiplier;
  set nightMultiplier(num? nightMultiplier) =>
      _$this._nightMultiplier = nightMultiplier;

  num? _weekendMultiplier;
  num? get weekendMultiplier => _$this._weekendMultiplier;
  set weekendMultiplier(num? weekendMultiplier) =>
      _$this._weekendMultiplier = weekendMultiplier;

  num? _surgeMultiplier;
  num? get surgeMultiplier => _$this._surgeMultiplier;
  set surgeMultiplier(num? surgeMultiplier) =>
      _$this._surgeMultiplier = surgeMultiplier;

  int? _nightStartHour;
  int? get nightStartHour => _$this._nightStartHour;
  set nightStartHour(int? nightStartHour) =>
      _$this._nightStartHour = nightStartHour;

  int? _nightEndHour;
  int? get nightEndHour => _$this._nightEndHour;
  set nightEndHour(int? nightEndHour) => _$this._nightEndHour = nightEndHour;

  int? _cancellationGraceSec;
  int? get cancellationGraceSec => _$this._cancellationGraceSec;
  set cancellationGraceSec(int? cancellationGraceSec) =>
      _$this._cancellationGraceSec = cancellationGraceSec;

  num? _cancellationFeeAcceptedUsd;
  num? get cancellationFeeAcceptedUsd => _$this._cancellationFeeAcceptedUsd;
  set cancellationFeeAcceptedUsd(num? cancellationFeeAcceptedUsd) =>
      _$this._cancellationFeeAcceptedUsd = cancellationFeeAcceptedUsd;

  num? _cancellationFeeArrivedUsd;
  num? get cancellationFeeArrivedUsd => _$this._cancellationFeeArrivedUsd;
  set cancellationFeeArrivedUsd(num? cancellationFeeArrivedUsd) =>
      _$this._cancellationFeeArrivedUsd = cancellationFeeArrivedUsd;

  String? _notes;
  String? get notes => _$this._notes;
  set notes(String? notes) => _$this._notes = notes;

  bool? _deactivateOld;
  bool? get deactivateOld => _$this._deactivateOld;
  set deactivateOld(bool? deactivateOld) =>
      _$this._deactivateOld = deactivateOld;

  AdminTariffsCreateRequestBuilder() {
    AdminTariffsCreateRequest._defaults(this);
  }

  AdminTariffsCreateRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _city = $v.city;
      _active = $v.active;
      _baseFareUsd = $v.baseFareUsd;
      _perKmUsd = $v.perKmUsd;
      _perMinUsd = $v.perMinUsd;
      _minFareUsd = $v.minFareUsd;
      _nightMultiplier = $v.nightMultiplier;
      _weekendMultiplier = $v.weekendMultiplier;
      _surgeMultiplier = $v.surgeMultiplier;
      _nightStartHour = $v.nightStartHour;
      _nightEndHour = $v.nightEndHour;
      _cancellationGraceSec = $v.cancellationGraceSec;
      _cancellationFeeAcceptedUsd = $v.cancellationFeeAcceptedUsd;
      _cancellationFeeArrivedUsd = $v.cancellationFeeArrivedUsd;
      _notes = $v.notes;
      _deactivateOld = $v.deactivateOld;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminTariffsCreateRequest other) {
    _$v = other as _$AdminTariffsCreateRequest;
  }

  @override
  void update(void Function(AdminTariffsCreateRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminTariffsCreateRequest build() => _build();

  _$AdminTariffsCreateRequest _build() {
    final _$result = _$v ??
        _$AdminTariffsCreateRequest._(
          city: BuiltValueNullFieldError.checkNotNull(
              city, r'AdminTariffsCreateRequest', 'city'),
          active: active,
          baseFareUsd: BuiltValueNullFieldError.checkNotNull(
              baseFareUsd, r'AdminTariffsCreateRequest', 'baseFareUsd'),
          perKmUsd: BuiltValueNullFieldError.checkNotNull(
              perKmUsd, r'AdminTariffsCreateRequest', 'perKmUsd'),
          perMinUsd: BuiltValueNullFieldError.checkNotNull(
              perMinUsd, r'AdminTariffsCreateRequest', 'perMinUsd'),
          minFareUsd: minFareUsd,
          nightMultiplier: nightMultiplier,
          weekendMultiplier: weekendMultiplier,
          surgeMultiplier: surgeMultiplier,
          nightStartHour: nightStartHour,
          nightEndHour: nightEndHour,
          cancellationGraceSec: cancellationGraceSec,
          cancellationFeeAcceptedUsd: cancellationFeeAcceptedUsd,
          cancellationFeeArrivedUsd: cancellationFeeArrivedUsd,
          notes: notes,
          deactivateOld: deactivateOld,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
