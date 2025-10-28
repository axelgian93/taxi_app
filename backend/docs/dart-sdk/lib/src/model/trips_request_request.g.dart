// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsRequestRequest extends TripsRequestRequest {
  @override
  final String city;
  @override
  final num pickupLat;
  @override
  final num pickupLng;
  @override
  final num dropoffLat;
  @override
  final num dropoffLng;
  @override
  final String? pickupAddress;
  @override
  final String? dropoffAddress;
  @override
  final num distanceKm;
  @override
  final num durationMin;

  factory _$TripsRequestRequest(
          [void Function(TripsRequestRequestBuilder)? updates]) =>
      (TripsRequestRequestBuilder()..update(updates))._build();

  _$TripsRequestRequest._(
      {required this.city,
      required this.pickupLat,
      required this.pickupLng,
      required this.dropoffLat,
      required this.dropoffLng,
      this.pickupAddress,
      this.dropoffAddress,
      required this.distanceKm,
      required this.durationMin})
      : super._();
  @override
  TripsRequestRequest rebuild(
          void Function(TripsRequestRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequestRequestBuilder toBuilder() =>
      TripsRequestRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequestRequest &&
        city == other.city &&
        pickupLat == other.pickupLat &&
        pickupLng == other.pickupLng &&
        dropoffLat == other.dropoffLat &&
        dropoffLng == other.dropoffLng &&
        pickupAddress == other.pickupAddress &&
        dropoffAddress == other.dropoffAddress &&
        distanceKm == other.distanceKm &&
        durationMin == other.durationMin;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, city.hashCode);
    _$hash = $jc(_$hash, pickupLat.hashCode);
    _$hash = $jc(_$hash, pickupLng.hashCode);
    _$hash = $jc(_$hash, dropoffLat.hashCode);
    _$hash = $jc(_$hash, dropoffLng.hashCode);
    _$hash = $jc(_$hash, pickupAddress.hashCode);
    _$hash = $jc(_$hash, dropoffAddress.hashCode);
    _$hash = $jc(_$hash, distanceKm.hashCode);
    _$hash = $jc(_$hash, durationMin.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsRequestRequest')
          ..add('city', city)
          ..add('pickupLat', pickupLat)
          ..add('pickupLng', pickupLng)
          ..add('dropoffLat', dropoffLat)
          ..add('dropoffLng', dropoffLng)
          ..add('pickupAddress', pickupAddress)
          ..add('dropoffAddress', dropoffAddress)
          ..add('distanceKm', distanceKm)
          ..add('durationMin', durationMin))
        .toString();
  }
}

class TripsRequestRequestBuilder
    implements Builder<TripsRequestRequest, TripsRequestRequestBuilder> {
  _$TripsRequestRequest? _$v;

  String? _city;
  String? get city => _$this._city;
  set city(String? city) => _$this._city = city;

  num? _pickupLat;
  num? get pickupLat => _$this._pickupLat;
  set pickupLat(num? pickupLat) => _$this._pickupLat = pickupLat;

  num? _pickupLng;
  num? get pickupLng => _$this._pickupLng;
  set pickupLng(num? pickupLng) => _$this._pickupLng = pickupLng;

  num? _dropoffLat;
  num? get dropoffLat => _$this._dropoffLat;
  set dropoffLat(num? dropoffLat) => _$this._dropoffLat = dropoffLat;

  num? _dropoffLng;
  num? get dropoffLng => _$this._dropoffLng;
  set dropoffLng(num? dropoffLng) => _$this._dropoffLng = dropoffLng;

  String? _pickupAddress;
  String? get pickupAddress => _$this._pickupAddress;
  set pickupAddress(String? pickupAddress) =>
      _$this._pickupAddress = pickupAddress;

  String? _dropoffAddress;
  String? get dropoffAddress => _$this._dropoffAddress;
  set dropoffAddress(String? dropoffAddress) =>
      _$this._dropoffAddress = dropoffAddress;

  num? _distanceKm;
  num? get distanceKm => _$this._distanceKm;
  set distanceKm(num? distanceKm) => _$this._distanceKm = distanceKm;

  num? _durationMin;
  num? get durationMin => _$this._durationMin;
  set durationMin(num? durationMin) => _$this._durationMin = durationMin;

  TripsRequestRequestBuilder() {
    TripsRequestRequest._defaults(this);
  }

  TripsRequestRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _city = $v.city;
      _pickupLat = $v.pickupLat;
      _pickupLng = $v.pickupLng;
      _dropoffLat = $v.dropoffLat;
      _dropoffLng = $v.dropoffLng;
      _pickupAddress = $v.pickupAddress;
      _dropoffAddress = $v.dropoffAddress;
      _distanceKm = $v.distanceKm;
      _durationMin = $v.durationMin;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequestRequest other) {
    _$v = other as _$TripsRequestRequest;
  }

  @override
  void update(void Function(TripsRequestRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequestRequest build() => _build();

  _$TripsRequestRequest _build() {
    final _$result = _$v ??
        _$TripsRequestRequest._(
          city: BuiltValueNullFieldError.checkNotNull(
              city, r'TripsRequestRequest', 'city'),
          pickupLat: BuiltValueNullFieldError.checkNotNull(
              pickupLat, r'TripsRequestRequest', 'pickupLat'),
          pickupLng: BuiltValueNullFieldError.checkNotNull(
              pickupLng, r'TripsRequestRequest', 'pickupLng'),
          dropoffLat: BuiltValueNullFieldError.checkNotNull(
              dropoffLat, r'TripsRequestRequest', 'dropoffLat'),
          dropoffLng: BuiltValueNullFieldError.checkNotNull(
              dropoffLng, r'TripsRequestRequest', 'dropoffLng'),
          pickupAddress: pickupAddress,
          dropoffAddress: dropoffAddress,
          distanceKm: BuiltValueNullFieldError.checkNotNull(
              distanceKm, r'TripsRequestRequest', 'distanceKm'),
          durationMin: BuiltValueNullFieldError.checkNotNull(
              durationMin, r'TripsRequestRequest', 'durationMin'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
