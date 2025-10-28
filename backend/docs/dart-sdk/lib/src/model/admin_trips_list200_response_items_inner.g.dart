// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_trips_list200_response_items_inner.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminTripsList200ResponseItemsInner
    extends AdminTripsList200ResponseItemsInner {
  @override
  final String? id;
  @override
  final String? status;
  @override
  final String? riderId;
  @override
  final String? driverId;
  @override
  final DateTime? requestedAt;
  @override
  final DateTime? completedAt;
  @override
  final num? costUsd;
  @override
  final String? currency;

  factory _$AdminTripsList200ResponseItemsInner(
          [void Function(AdminTripsList200ResponseItemsInnerBuilder)?
              updates]) =>
      (AdminTripsList200ResponseItemsInnerBuilder()..update(updates))._build();

  _$AdminTripsList200ResponseItemsInner._(
      {this.id,
      this.status,
      this.riderId,
      this.driverId,
      this.requestedAt,
      this.completedAt,
      this.costUsd,
      this.currency})
      : super._();
  @override
  AdminTripsList200ResponseItemsInner rebuild(
          void Function(AdminTripsList200ResponseItemsInnerBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminTripsList200ResponseItemsInnerBuilder toBuilder() =>
      AdminTripsList200ResponseItemsInnerBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminTripsList200ResponseItemsInner &&
        id == other.id &&
        status == other.status &&
        riderId == other.riderId &&
        driverId == other.driverId &&
        requestedAt == other.requestedAt &&
        completedAt == other.completedAt &&
        costUsd == other.costUsd &&
        currency == other.currency;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, status.hashCode);
    _$hash = $jc(_$hash, riderId.hashCode);
    _$hash = $jc(_$hash, driverId.hashCode);
    _$hash = $jc(_$hash, requestedAt.hashCode);
    _$hash = $jc(_$hash, completedAt.hashCode);
    _$hash = $jc(_$hash, costUsd.hashCode);
    _$hash = $jc(_$hash, currency.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AdminTripsList200ResponseItemsInner')
          ..add('id', id)
          ..add('status', status)
          ..add('riderId', riderId)
          ..add('driverId', driverId)
          ..add('requestedAt', requestedAt)
          ..add('completedAt', completedAt)
          ..add('costUsd', costUsd)
          ..add('currency', currency))
        .toString();
  }
}

class AdminTripsList200ResponseItemsInnerBuilder
    implements
        Builder<AdminTripsList200ResponseItemsInner,
            AdminTripsList200ResponseItemsInnerBuilder> {
  _$AdminTripsList200ResponseItemsInner? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _status;
  String? get status => _$this._status;
  set status(String? status) => _$this._status = status;

  String? _riderId;
  String? get riderId => _$this._riderId;
  set riderId(String? riderId) => _$this._riderId = riderId;

  String? _driverId;
  String? get driverId => _$this._driverId;
  set driverId(String? driverId) => _$this._driverId = driverId;

  DateTime? _requestedAt;
  DateTime? get requestedAt => _$this._requestedAt;
  set requestedAt(DateTime? requestedAt) => _$this._requestedAt = requestedAt;

  DateTime? _completedAt;
  DateTime? get completedAt => _$this._completedAt;
  set completedAt(DateTime? completedAt) => _$this._completedAt = completedAt;

  num? _costUsd;
  num? get costUsd => _$this._costUsd;
  set costUsd(num? costUsd) => _$this._costUsd = costUsd;

  String? _currency;
  String? get currency => _$this._currency;
  set currency(String? currency) => _$this._currency = currency;

  AdminTripsList200ResponseItemsInnerBuilder() {
    AdminTripsList200ResponseItemsInner._defaults(this);
  }

  AdminTripsList200ResponseItemsInnerBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _status = $v.status;
      _riderId = $v.riderId;
      _driverId = $v.driverId;
      _requestedAt = $v.requestedAt;
      _completedAt = $v.completedAt;
      _costUsd = $v.costUsd;
      _currency = $v.currency;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminTripsList200ResponseItemsInner other) {
    _$v = other as _$AdminTripsList200ResponseItemsInner;
  }

  @override
  void update(
      void Function(AdminTripsList200ResponseItemsInnerBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminTripsList200ResponseItemsInner build() => _build();

  _$AdminTripsList200ResponseItemsInner _build() {
    final _$result = _$v ??
        _$AdminTripsList200ResponseItemsInner._(
          id: id,
          status: status,
          riderId: riderId,
          driverId: driverId,
          requestedAt: requestedAt,
          completedAt: completedAt,
          costUsd: costUsd,
          currency: currency,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
